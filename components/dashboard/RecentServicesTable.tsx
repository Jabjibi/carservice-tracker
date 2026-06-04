import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { baht } from '@/lib/utils'
import { LicensePlate } from '@/components/shared/LicensePlate'
import type { RecentService } from '@/lib/types'

type RecentServicesTableProps = {
  items: ReadonlyArray<RecentService>
}

export function RecentServicesTable({ items }: RecentServicesTableProps) {
  return (
    <div>
      <header className="mb-5">
        <h2 className="text-text-primary text-[15px] font-semibold">บริการล่าสุด</h2>
      </header>
      <Table>
        <TableHeader>
          <TableRow className="border-black/[0.06] hover:bg-transparent">
            <TableHead className="text-text-secondary text-[12px] font-medium">วันที่</TableHead>
            <TableHead className="text-text-secondary text-[12px] font-medium">รถ</TableHead>
            <TableHead className="text-text-secondary text-[12px] font-medium">ประเภท</TableHead>
            <TableHead className="text-text-secondary text-right text-[12px] font-medium">
              ค่าใช้จ่าย
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.id} className="border-black/[0.04] hover:bg-black/[0.02]">
              <TableCell className="text-text-secondary py-4 text-[13px]">{row.date}</TableCell>
              <TableCell className="py-4">
                <div className="text-text-primary text-[13px] font-medium">{row.carName}</div>
                <LicensePlate value={row.plate} className="mt-0.5 block" />
              </TableCell>
              <TableCell className="text-text-secondary py-4 text-[13px]">{row.type}</TableCell>
              <TableCell className="text-text-primary py-4 text-right text-[14px] font-semibold">
                {baht(row.cost)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
