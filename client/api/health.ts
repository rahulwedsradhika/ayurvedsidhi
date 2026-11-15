import { dataCounts, previewGet } from '../serverless/previewDb';
export default function handler(req: any, res: any): void {
  previewGet(req, res, () => dataCounts());
}
