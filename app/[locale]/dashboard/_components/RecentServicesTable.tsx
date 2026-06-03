import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LicensePlate } from '@/components/shared/LicensePlate'
import type { RecentService } from '@/lib/types'

type RecentServicesTableProps = {
  items: ReadonlyArray<RecentService>
}

const baht = (n: number) => `฿${n.toLocaleString('th-TH')}`

export function RecentServicesTable({ items }: RecentServicesTableProps) {
  return (
    <div>
      <header className="mb-5">
        <h2 className="text-[15px] font-semibold text-[#1D1D1F]">บริการล่าสุด</h2>
      </header>
      <Table>
        <TableHeader>
          <TableRow className="border-black/[0.06] hover:bg-transparent">
            <TableHead className="text-[12px] font-medium text-[#86868B]">
              วันที่
            </TableHead>
            <TableHead className="text-[12px] font-medium text-[#86868B]">
              รถ
            </TableHead>
            <TableHead className="text-[12px] font-medium text-[#86868B]">
              ประเภท
            </TableHead>
            <TableHead className="text-right text-[12px] font-medium text-[#86868B]">
              ค่าใช้จ่าย
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.id}
              className="border-black/[0.04] hover:bg-black/[0.02]"
            >
              <TableCell className="py-4 text-[13px] text-[#6E6E73]">
                {row.date}
              </TableCell>
              <TableCell className="py-4">
                <div className="text-[13px] font-medium text-[#1D1D1F]">
                  {row.carName}
                </div>
                <LicensePlate value={row.plate} className="mt-0.5 block" />
              </TableCell>
              <TableCell className="py-4 text-[13px] text-[#6E6E73]">
                {row.type}
              </TableCell>
              <TableCell className="py-4 text-right text-[14px] font-semibold text-[#1D1D1F]">
                {baht(row.cost)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
