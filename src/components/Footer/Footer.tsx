export default function Footer() {
  return (
    <footer className='py-16 bg-neutral-100'>
      <div className='max-w-7xl px-4 mx-auto text-sm font-light'>
        <div className='grid grid-cols-1 lg:grid-cols-3 text-center lg:text-start'>
          <div className='lg:col-span-1 mt-2'>© 2024 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className='lg:col-span-2 mt-2'>
            Quốc gia & Khu vực: Singapore | Indonesia | Thái Lan | Malaysia | Việt Nam | | Philippines | Brazil | México
            | Colombia Chile Đài Loan
          </div>
        </div>
        <div className='flex justify-center mt-16'>
          <span className='mx-5'>CHÍNH SÁCH BẢO MẬT</span>
          <span>|</span>
          <span className='mx-5'>QUY CHẾ HOẠT ĐỘNG</span>
          <span>|</span>
          <span className='mx-5'>CHÍNH SÁCH VẬN HÀNH</span>
          <span>|</span>
          <span className='mx-5'>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</span>
        </div>
        <div className='text-center mt-10'>
          <div className='mt-3'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-3'>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn</div>
          <div className='mt-3'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-3'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}
