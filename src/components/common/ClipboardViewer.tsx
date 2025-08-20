import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useClipboard } from '@/hooks/useClipboard';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import {
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  KeyRound,
  Loader2,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface ClipboardViewerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onCaptureComplete?: (data: any) => void;
}

export function ClipboardViewer({
  className,
  onCaptureComplete,
  ...props
}: ClipboardViewerProps) {
  const { clipboardData, isLoading, error, readClipboard } = useClipboard();
  const { t } = useTranslation();
  const [showManualInstructions, setShowManualInstructions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCapture = async () => {
    setShowManualInstructions(true);
    await readClipboard();
  };

  // 在loading状态持续1.5秒后显示手动指导
  useEffect(() => {
    let timer: number;
    if (isLoading) {
      timer = window.setTimeout(() => {
        setShowManualInstructions(true);
      }, 1500);
    } else {
      setShowManualInstructions(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            {t('clipboard.loading.title')}
          </p>

          {showManualInstructions && (
            <div className="mt-4 max-w-sm rounded-lg border bg-card/50 p-3 text-center shadow-sm">
              <p className="text-sm font-medium">{t('clipboard.loading.manualPaste')}</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <KeyRound className="h-3 w-3" />
                <span>
                  {t('clipboard.loading.instruction')}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-sm text-destructive">{error}</p>
          <div className="mt-4 max-w-sm rounded-lg border bg-card/50 p-3 text-center shadow-sm">
            <p className="text-sm font-medium">{t('clipboard.error.manualPaste')}</p>
            <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <span>
                {t('clipboard.error.instruction')}
              </span>
            </div>
          </div>
          <Button variant="outline" className="mt-4" onClick={handleCapture}>
            {t('clipboard.error.retry')}
          </Button>
        </div>
      );
    }

    if (!clipboardData) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Clipboard className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-center text-muted-foreground">
            {t('clipboard.emptyState.title')}
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {t('clipboard.emptyState.subtitle')}
          </p>
        </div>
      );
    }

    // 简化的内容展示 - 显示所有 MIME 类型的原始数据
    return (
      <div className="max-h-[500px] overflow-y-auto space-y-4">
        {clipboardData.items.length === 0 ? (
          <p className="text-muted-foreground">{t('clipboard.content.noData')}</p>
        ) : (
          clipboardData.items.map((item, index) => (
            <div key={index} className="rounded-md border bg-card">
              <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{item.type}</span>
                  {(item as any).isImage && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100">
                      {t('clipboard.content.imageLabel')}
                    </span>
                  )}
                  {(item as any).isFile && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                      {t('clipboard.content.fileLabel')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {(item as any).size && (
                    <span>{((item as any).size / 1024).toFixed(1)} KB</span>
                  )}
                  <span>{item.data.length} {t('clipboard.content.characters')}</span>
                </div>
              </div>
              <div className="p-4">
                {(item as any).isImage && item.data.startsWith('data:image') ? (
                  <div className="space-y-2">
                    <div className="flex justify-center">
                                            <img
                        src={item.data}
                        alt={t('clipboard.content.imageAlt')}
                        className="max-h-48 max-w-full rounded border object-contain"
                        onError={(e) => {
                          console.error('图片加载失败:', e);
                        }}
                      />
                    </div>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                        {t('clipboard.content.viewBase64')} ({item.data.length} {t('clipboard.content.characters')})
                      </summary>
                      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed bg-muted/50 p-2 rounded">
                        {item.data}
                      </pre>
                    </details>
                  </div>
                ) : item.data.length > 1000 ? (
                  <div className="space-y-2">
                    <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
                      {item.data.substring(0, 1000)}...
                    </pre>
                    <details>
                      <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                        {t('clipboard.content.viewFull')} ({t('clipboard.content.totalCharacters', { count: item.data.length })})
                      </summary>
                      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed bg-muted/50 p-2 rounded">
                        {item.data}
                      </pre>
                    </details>
                  </div>
                ) : (
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
                    {item.data || <span className="text-muted-foreground">{t('clipboard.content.empty')}</span>}
                  </pre>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <Card
      className={cn('w-full', className)}
      {...props}
      ref={containerRef}
      tabIndex={0}
      onPaste={() => {
        if (!clipboardData && !isLoading) {
          handleCapture();
        }
      }}
    >
      <CardHeader>
        <CardTitle>{t('clipboard.title')}</CardTitle>
        <CardDescription>
          {t('clipboard.description')}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {renderContent()}
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          {clipboardData && (
            <>
              <ClipboardList className="mr-2 h-4 w-4" />
              <span>{t('clipboard.status.detected', { count: clipboardData.items.length })}</span>
            </>
          )}
        </div>
        <Button
          onClick={handleCapture}
          disabled={isLoading}
          className="ml-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('clipboard.actions.parsing')}
            </>
          ) : clipboardData ? (
            <>
              <ClipboardCheck className="mr-2 h-4 w-4" />
              {t('clipboard.actions.reparse')}
            </>
          ) : (
            <>
              <Clipboard className="mr-2 h-4 w-4" />
              {t('clipboard.actions.parse')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
