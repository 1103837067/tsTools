import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/useToast';
import { useTranslation } from '@/hooks/useTranslation';
import { Check, Copy, Edit3, X } from 'lucide-react';
import { useState } from 'react';

interface EditableContentProps {
  content: string;
  type: string;
  maxPreviewLength?: number;
  isImage?: boolean;
  isFile?: boolean;
}

export function EditableContent({ 
  content, 
  maxPreviewLength = 1000,
  isImage = false 
}: EditableContentProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(content);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success(t('clipboard.edit.saved'));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedContent);
      toast.success(t('clipboard.edit.copied'));
    } catch (err) {
      toast.error(t('clipboard.edit.copyError'));
    }
  };

  // 图片内容的特殊处理
  if (isImage && content.startsWith('data:image')) {
    return (
      <div className="space-y-2">
        <div className="flex justify-center">
          <img 
            src={content} 
            alt={t('clipboard.content.imageAlt')} 
            className="max-h-48 max-w-full rounded border object-contain"
            onError={(e) => {
              console.error('图片加载失败:', e);
            }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {t('clipboard.content.viewBase64')} ({content.length} {t('clipboard.content.characters')})
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            {t('clipboard.edit.copyBase64')}
          </Button>
        </div>
        
        <details>
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
            {showFullContent ? t('clipboard.edit.hideContent') : t('clipboard.edit.showContent')}
          </summary>
          <div className="mt-2 space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[200px] font-mono text-xs"
                  placeholder={t('clipboard.edit.placeholder')}
                />
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSave}
                    className="gap-2"
                  >
                    <Check className="h-4 w-4" />
                    {t('clipboard.edit.save')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    {t('clipboard.edit.cancel')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed bg-muted/50 p-2 rounded">
                  {editedContent}
                </pre>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    {t('clipboard.edit.edit')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {t('clipboard.edit.copy')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </details>
      </div>
    );
  }

  // 文本内容的处理
  const shouldTruncate = content.length > maxPreviewLength && !showFullContent;
  const displayContent = shouldTruncate ? content.substring(0, maxPreviewLength) + '...' : content;
  const currentContent = isEditing ? editedContent : (shouldTruncate ? displayContent : editedContent);

  return (
    <div className="space-y-2">
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[200px] font-mono text-xs"
            placeholder={t('clipboard.edit.placeholder')}
          />
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              {t('clipboard.edit.save')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              {t('clipboard.edit.cancel')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed bg-muted/50 p-2 rounded">
            {currentContent || <span className="text-muted-foreground">{t('clipboard.content.empty')}</span>}
          </pre>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {shouldTruncate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullContent(true)}
                  className="text-xs"
                >
                  {t('clipboard.edit.showMore')} ({t('clipboard.content.totalCharacters', { count: content.length })})
                </Button>
              )}
              {!shouldTruncate && content.length > maxPreviewLength && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullContent(false)}
                  className="text-xs"
                >
                  {t('clipboard.edit.showLess')}
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="gap-2"
              >
                <Edit3 className="h-4 w-4" />
                {t('clipboard.edit.edit')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {t('clipboard.edit.copy')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
