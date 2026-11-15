import { fullTest, previewGet } from '../../serverless/previewDb';

export default function handler(req: any, res: any): void {
  previewGet(req, res, () => {
    const raw = Array.isArray(req.query?.id) ? req.query.id[0] : req.query?.id;
    const idText = raw || (req.url || '').split('?')[0].split('/').pop();
    if (!/^[1-9][0-9]*$/.test(String(idText))) return null;
    return fullTest(Number(idText));
  });
}
