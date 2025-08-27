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
import { toast } from '@/hooks/useToast';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import {
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  Copy,
  Loader2,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { EditableContent } from './EditableContent';

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 管理所有编辑后的内容
  const [editedContents, setEditedContents] = useState<Record<number, string>>({});

  const handleCapture = async () => {
    await readClipboard();
    // 重置编辑内容
    setEditedContents({});
  };

  // 更新特定索引的编辑内容
  const updateEditedContent = (index: number, content: string) => {
    setEditedContents(prev => ({
      ...prev,
      [index]: content
    }));
  };

  // 获取编辑后的内容，如果没有编辑则返回原始内容
  const getEditedContent = (index: number, originalContent: string) => {
    return editedContents[index] ?? originalContent;
  };

  const handleCopyAllTypes = async () => {
    if (!clipboardData || !clipboardData.items.length) return;

    try {
      // 构建包含所有编辑后类型的 ClipboardItem
      const clipboardItems: Record<string, Blob> = {};
      
      for (let index = 0; index < clipboardData.items.length; index++) {
        const item = clipboardData.items[index];
        // 获取编辑后的内容
        const editedContent = getEditedContent(index, item.data);
        
        try {
          if (item.type.startsWith('image/') && editedContent.startsWith('data:')) {
            // 处理编辑后的图片类型
            const response = await fetch(editedContent);
            const blob = await response.blob();
            clipboardItems[item.type] = blob;
          } else {
            // 处理编辑后的其他类型
            const blob = new Blob([editedContent], { type: item.type });
            clipboardItems[item.type] = blob;
          }
        } catch (err) {
          console.warn(`无法处理类型 ${item.type}:`, err);
        }
      }

      if (Object.keys(clipboardItems).length > 0) {
        const clipboardItem = new ClipboardItem(clipboardItems);
        await navigator.clipboard.write([clipboardItem]);
        const itemCount = Object.keys(clipboardItems).length;
        toast.success(t('clipboard.actions.copyAllSuccess', { count: itemCount }));
      } else {
        throw new Error('没有可复制的类型');
      }
    } catch (err) {
      console.error('复制所有类型失败:', err);
      toast.error(t('clipboard.actions.copyAllError'));
    }
  };



  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            {t('clipboard.loading.title')}
          </p>


        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-sm text-destructive">{error}</p>
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
              <div className="flex items-center justify-between border-b bg-muted/50 px-3 sm:px-4 py-2">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                  <span className="font-medium text-xs sm:text-sm truncate">{item.type}</span>
                  {(item as any).isImage && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100 shrink-0">
                      {t('clipboard.content.imageLabel')}
                    </span>
                  )}
                  {(item as any).isFile && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-100 shrink-0">
                      {t('clipboard.content.fileLabel')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {(item as any).size && (
                    <span className="hidden sm:inline">{((item as any).size / 1024).toFixed(1)} KB</span>
                  )}
                  <span className="hidden sm:inline">{getEditedContent(index, item.data).length} {t('clipboard.content.characters')}</span>
                  <span className="sm:hidden">{getEditedContent(index, item.data).length}</span>
                </div>
              </div>
                            <div className="p-3 sm:p-4">
                <EditableContent
                  content={item.data}
                  isImage={(item as any).isImage}
                  index={index}
                  onContentChange={updateEditedContent}
                  getEditedContent={(content) => getEditedContent(index, content)}
                />
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
        <div className="flex gap-2">
          {clipboardData && clipboardData.items.length > 0 && (
            <Button
              variant="outline"
              onClick={handleCopyAllTypes}
              disabled={isLoading}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              {t('clipboard.actions.copyAll')}
            </Button>
          )}
          <Button
            onClick={handleCapture}
            disabled={isLoading}
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
        </div>
      </CardFooter>
    </Card>
  );
}
