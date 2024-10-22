import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productApiSlice";
import "./Product.css";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const productz = [
    {
      _id: "1",
      image:
        "https://res.cloudinary.com/dvn5ulypk/image/upload/v1729609377/furryfriendngo/uliaknqaidcueemcj1vw.jpg",
      linkto: "https://strayanimalfoundationindia.org/",
      name: "site 1",
      headline: "A BETTER LIFE FOR INDIA'S STRAY ANIMALS",
    },
    {
      _id: "2",
      image:
        "https://res.cloudinary.com/dvn5ulypk/image/upload/v1729609378/furryfriendngo/gvsdng1h69n7thcvux1u.jpg",
      linkto: "https://amtmindia.org/",
      name: "site 2",
      headline: "Help Us Help Them",
    },
    {
      _id: "3",
      image:
        "https://res.cloudinary.com/dvn5ulypk/image/upload/v1729609378/furryfriendngo/xvfh1hcqdvnosclvvlqn.jpg",
      linkto: "https://www.peopleforanimalsindia.org/",
      name: "site 3",
      headline: "People For Animals",
    },
  ];

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-light mb-4">
      {productz.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`{product.linkto}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{ height: "60vh" }}
            />
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-left">{product.headline}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
