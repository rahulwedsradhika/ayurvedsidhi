import { previewGet, testRows } from '../serverless/previewDb';

export default function handler(req: any, res: any): void {
  previewGet(req, res, () => {
    const url = new URL(req.url || '/', 'http://localhost');
    const category = url.searchParams.get('category') || undefined;
    return testRows(category);
  });
}
