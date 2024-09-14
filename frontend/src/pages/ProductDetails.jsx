import { Button, Container, Heading, Image, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
	const { id } = useParams();
	const { data, error, isLoading } = useSWR(`/products/${id}`, fetcher);

	return (
		<Container maxW={"container.xl"}>
			<VStack spacing={8}>
				<Heading
					size={"lg"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					Product Details 🚀
				</Heading>
				<Button fontSize="xl" variant="link" color="blue.500">
					<Link to={"/products"}>Back</Link>
				</Button>
				{isLoading && <p>Loading...</p>}
				{error && <p>Error :(</p>}
				{data && (
					<>
						<Image src={data.image} boxSize="30%" alt={data.name} />
						<h1>{data.name}</h1>
						<h2>${data.price}</h2>
						<h3>{data.description}</h3>
					</>
				)}
			</VStack>
		</Container>
	);
}

export default ProductDetails;
