import { dataCounts, previewGet } from '../serverless/previewDb.js';
export default function handler(req, res) {
  previewGet(req, res, () => dataCounts());
}
