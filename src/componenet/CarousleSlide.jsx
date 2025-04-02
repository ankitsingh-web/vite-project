function CarouselSlide({
  Image,
  title,
  description,
  slideNumber,
  totoalSlide,
}) {
  return (
    <>
      {" "}
      <div
        id={`slide1${slideNumber}`}
        className="carousel-item relative w-full"
      >
        <img src={Image} className="w-full rounded-full" />
        <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide4"
            className="btn btn-circle bg-transparent border-0 hover:bg-transparent  hover:border-0"
          >
            ❮
          </a>
          <a
            href="#slide2"
            className="btn btn-circle bg-transparent border-0 hover:bg-transparent  hover:border-0"
          >
            ❯
          </a>
        </div>
      </div>
    </>
  );
}
export default CarouselSlide;
