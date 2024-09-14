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
import ProductCard from "../components/ProductCard";
import CreateProduct from "../components/modals/CreateProduct";
import useSWR, { mutate } from "swr";
import fetcher from "../utils/fetcher";

function HomePage() {
	const { data: products, error, isLoading } = useSWR(`/products`, fetcher);

	const createModal = useDisclosure();

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

				<Skeleton fadeDuration={1} isLoaded={!isLoading}>
					<SimpleGrid
						columns={{
							base: 1,
							md: 2,
							lg: 3
						}}
						spacing={10}
						w={"full"}
					>
						{products &&
							products.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
								/>
							))}
					</SimpleGrid>

					{products && products.length === 0 && (
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
