import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImg from "../assets/Images/about.jpg";

function AboutUs() {
  return (
    <>
      <HomeLayout>
        <div className="flex flex-col pl-20 pt-20 text-white">
          <div className="flex items-center gap-5 mx-10">
            <section className="w-1/2 space-y-10">
              <h1 className="text-5xl text-yellow-500 font-semibold">
                Affordable and Quality Product
              </h1>
              <p className="text-xl text-gray-200">
                Our goal is to provide the affordable and quality education to
                the world. We are providing the platform for the aspiring
                teachers and students to share their creativity, skills and
                knowledge to each other to empower and contribute in the growth
                and wellness of the mankind.
              </p>
            </section>
            <div className="w-[40%] h-[40%]">
              <img
                style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }}
                className="drop-shadow-2xl rounded-xl"
                src={aboutMainImg}
                alt=""
              />
            </div>
          </div>

          <div className="carousel w-[25vh] mt-10 ml-auto mr-auto h-[25vh]">
            <div id="slide1" className="carousel-item relative w-full">
              <img
                src="https://res.cloudinary.com/dktoofnvs/image/upload/v1726818411/rs2zcoflysd8fhfq16vt.jpg"
                className="w-full rounded-full"
              />
              <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href="#slide4"
                  className="btn btn-circle bg-transparent border-0 z-50 hover:bg-transparent hover:border-0"
                >
                  ❮
                </a>
                <a
                  href="#slide2"
                  className="btn btn-circle bg-transparent border-0 z-50 hover:bg-transparent hover:border-0"
                >
                  ❯
                </a>
              </div>
              <p className="absolute bottom-0 z-50 w-full text-center bg-black bg-opacity-20 py-0">
                Nelson Mandela
              </p>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img
                src="https://res.cloudinary.com/dktoofnvs/image/upload/v1726818411/oiaullf9pdqgem0sg8aw.jpg"
                className="w-full rounded-full"
              />
              <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href="#slide1"
                  className="btn btn-circle bg-transparent border-0 hover:bg-transparent hover:border-0"
                >
                  ❮
                </a>
                <a
                  href="#slide3"
                  className="btn btn-circle bg-transparent border-0 hover:bg-transparent hover:border-0"
                >
                  ❯
                </a>
              </div>
              <p className="absolute bottom-0 z-50 w-full text-center bg-black bg-opacity-20 py-0">
                Kalpana Chawla
              </p>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img
                src="https://res.cloudinary.com/dktoofnvs/image/upload/v1726818411/atxafjhu10yszxf5pwas.jpg"
                className="w-full rounded-full"
              />
              <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href="#slide2"
                  className="btn btn-circle bg-transparent border-0 z-50 hover:bg-transparent hover:border-0"
                >
                  ❮
                </a>
                <a
                  href="#slide4"
                  className="btn btn-circle bg-transparent border-0 hover:bg-transparent hover:border-0"
                >
                  ❯
                </a>
              </div>
              <p className="absolute bottom-0 z-50 w-full text-center bg-black bg-opacity-20 py-0">
                A. P. J. Abdul Kalam
              </p>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img
                src="https://res.cloudinary.com/dktoofnvs/image/upload/v1726820259/ugc5k78rxm04z7ehbctz.jpg"
                className="w-full rounded-full"
              />
              <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href="#slide3"
                  className="btn btn-circle bg-transparent border-0 hover:bg-transparent hover:border-0"
                >
                  ❮
                </a>
                <a
                  href="#slide1"
                  className="btn btn-circle bg-transparent border-0 hover:bg-transparent hover:border-0"
                >
                  ❯
                </a>
              </div>
              <p className="absolute bottom-0 z-50 w-full text-center bg-black bg-opacity-20 py-0 px-0">
                Mahatma Gandhi
              </p>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default AboutUs;
