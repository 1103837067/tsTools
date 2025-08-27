import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';

interface EditableContentProps {
  content: string;
  isImage?: boolean;
  index: number;
  onContentChange: (index: number, content: string) => void;
  getEditedContent: (originalContent: string) => string;
}

export function EditableContent({
  content,
  isImage = false,
  index,
  onContentChange,
  getEditedContent
}: EditableContentProps) {
  const { t } = useTranslation();

  // 使用从父组件传来的编辑内容
  const editedContent = getEditedContent(content);

  const handleContentChange = (newContent: string) => {
    onContentChange(index, newContent);
  };



    // 图片内容的特殊处理
  if (isImage && content.startsWith('data:image')) {
    return (
      <div className="space-y-3">
        <div className="flex justify-center">
          <img
            src={editedContent}
            alt={t('clipboard.content.imageAlt')}
            className="max-h-48 max-w-full rounded border object-contain"
            onError={(e) => {
              console.error('图片加载失败:', e);
            }}
          />
        </div>

        <div className="space-y-2">
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              {t('clipboard.content.viewBase64')}
            </span>
          </div>

          <Textarea
            value={editedContent}
            onChange={(e) => handleContentChange(e.target.value)}
            className="min-h-[80px] max-h-[120px] font-mono text-xs resize-none overflow-y-auto"
            placeholder={t('clipboard.edit.placeholder')}
          />
        </div>
      </div>
    );
  }

  // 文本内容的处理 - 直接可编辑
  return (
    <Textarea
      value={editedContent}
      onChange={(e) => handleContentChange(e.target.value)}
      className="min-h-[80px] max-h-[120px] font-mono text-xs resize-none overflow-y-auto"
      placeholder={t('clipboard.edit.placeholder')}
    />
  );
}
