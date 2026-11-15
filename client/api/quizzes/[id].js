import { fullTest, previewGet } from '../../serverless/previewDb.js';

export default function handler(req, res) {
  previewGet(req, res, () => {
    const raw = Array.isArray(req.query?.id) ? req.query.id[0] : req.query?.id;
    const idText = raw || (req.url || '').split('?')[0].split('/').pop();
    if (!/^[1-9][0-9]*$/.test(String(idText))) return null;
    return fullTest(Number(idText));
  });
}
