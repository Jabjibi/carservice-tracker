import type { Trip } from '@/lib/types'

export const trips: ReadonlyArray<Trip> = [
  // Honda Civic (c1)
  { id: 't1', carId: 'c1', date: '28 พ.ค. 2567', destination: 'เชียงใหม่', distanceKm: 720 },
  {
    id: 't2',
    carId: 'c1',
    date: '14 เม.ย. 2567',
    destination: 'หัวหิน',
    distanceKm: 280,
    notes: 'สงกรานต์',
  },
  { id: 't3', carId: 'c1', date: '2 ก.พ. 2567', destination: 'พัทยา', distanceKm: 150 },
  {
    id: 't4',
    carId: 'c1',
    date: '30 ธ.ค. 2566',
    destination: 'เขาใหญ่',
    distanceKm: 190,
    notes: 'ปีใหม่',
  },

  // Toyota Hilux Revo (c2)
  { id: 't5', carId: 'c2', date: '20 พ.ค. 2567', destination: 'อุดรธานี', distanceKm: 560 },
  { id: 't6', carId: 'c2', date: '5 มี.ค. 2567', destination: 'โคราช', distanceKm: 260 },
  { id: 't7', carId: 'c2', date: '18 ม.ค. 2567', destination: 'ขอนแก่น', distanceKm: 445 },

  // Honda PCX 160 (c3)
  { id: 't8', carId: 'c3', date: '25 พ.ค. 2567', destination: 'อยุธยา', distanceKm: 85 },
  {
    id: 't9',
    carId: 'c3',
    date: '10 เม.ย. 2567',
    destination: 'นครปฐม',
    distanceKm: 60,
    notes: 'ไปตลาดน้ำ',
  },
]
