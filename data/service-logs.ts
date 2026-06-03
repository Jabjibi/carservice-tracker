import type { ServiceLog } from '@/lib/types'

export const serviceLogs: ReadonlyArray<ServiceLog> = [
  // Honda Civic (c1)
  {
    id: 'sl1',
    carId: 'c1',
    date: '12 พ.ค. 2567',
    type: 'เปลี่ยนน้ำมันเครื่อง',
    mileage: 47000,
    cost: 850,
    shop: 'ศูนย์ Honda สาขาลาดพร้าว',
  },
  {
    id: 'sl2',
    carId: 'c1',
    date: '8 ม.ค. 2567',
    type: 'เปลี่ยนยางรถ 4 เส้น',
    mileage: 44000,
    cost: 12000,
    shop: 'ร้านยาง Super Tire',
    notes: 'เปลี่ยนยาง Bridgestone Ecopia ทั้ง 4 เส้น',
  },
  {
    id: 'sl3',
    carId: 'c1',
    date: '3 ส.ค. 2566',
    type: 'เปลี่ยนน้ำมันเครื่อง',
    mileage: 40000,
    cost: 850,
    shop: 'ศูนย์ Honda สาขาลาดพร้าว',
  },
  {
    id: 'sl4',
    carId: 'c1',
    date: '15 เม.ย. 2566',
    type: 'เปลี่ยนไส้กรองอากาศ',
    mileage: 38500,
    cost: 450,
  },

  // Toyota Hilux Revo (c2)
  {
    id: 'sl5',
    carId: 'c2',
    date: '20 เม.ย. 2567',
    type: 'เปลี่ยนน้ำมันเครื่อง',
    mileage: 91000,
    cost: 1200,
    shop: 'ศูนย์ Toyota สาขาบางนา',
  },
  {
    id: 'sl6',
    carId: 'c2',
    date: '5 ก.พ. 2567',
    type: 'ตรวจเช็คระยะ 90,000 กม.',
    mileage: 90000,
    cost: 4500,
    shop: 'ศูนย์ Toyota สาขาบางนา',
    notes: 'เปลี่ยนน้ำมันเกียร์, น้ำมันเฟืองท้าย, ไส้กรองอากาศ',
  },
  {
    id: 'sl7',
    carId: 'c2',
    date: '10 ต.ค. 2566',
    type: 'เปลี่ยนผ้าเบรค',
    mileage: 86000,
    cost: 3200,
    shop: 'ร้าน Top Brake',
  },

  // Honda PCX 160 (c3)
  {
    id: 'sl8',
    carId: 'c3',
    date: '1 มี.ค. 2567',
    type: 'เปลี่ยนน้ำมันเครื่อง',
    mileage: 10000,
    cost: 320,
    shop: 'ศูนย์ Honda Wing สาขาพระราม 9',
  },
  {
    id: 'sl9',
    carId: 'c3',
    date: '5 ต.ค. 2566',
    type: 'เปลี่ยนน้ำมันเครื่อง',
    mileage: 5000,
    cost: 320,
    shop: 'ศูนย์ Honda Wing สาขาพระราม 9',
  },
]
