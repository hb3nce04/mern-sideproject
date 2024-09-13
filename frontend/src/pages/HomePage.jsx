import {
	Button,
	Container,
	Heading,
	SimpleGrid,
	Skeleton,
	Text,
	useDisclosure,
	VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import CreateProduct from "../components/modals/CreateProduct";

function HomePage() {
	const { fetchProducts, products } = useProductStore();

	const [loading, setLoading] = useState(true);

	const createModal = useDisclosure();

	useEffect(() => {
		fetchProducts();
		setLoading(false);
	}, [fetchProducts]);

	return (
		<Container maxW={"container.xl"}>
			<VStack spacing={8}>
				<Heading
					size={"lg"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					Current Products 🚀
				</Heading>

				<Skeleton fadeDuration={1} isLoaded={!loading}>
					<SimpleGrid
						columns={{
							base: 1,
							md: 2,
							lg: 3
						}}
						spacing={10}
						w={"full"}
					>
						{products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</SimpleGrid>

					{!loading && products.length === 0 && (
						<Text
							fontSize="xl"
							textAlign={"center"}
							fontWeight="bold"
							color="gray.500"
						>
							No products found.{" "}
							<Button
								fontSize="xl"
								variant="link"
								color="blue.500"
								onClick={createModal.onOpen}
							>
								Create one!
							</Button>
						</Text>
					)}
				</Skeleton>
			</VStack>
			<CreateProduct disclosure={createModal} />
		</Container>
	);
}

export default HomePage;
