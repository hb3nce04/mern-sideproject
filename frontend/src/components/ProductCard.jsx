import {
	Box,
	Heading,
	HStack,
	IconButton,
	Image,
	Text,
	useColorModeValue,
	useDisclosure
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditProduct from "./modals/EditProduct";
import DeleteProduct from "./modals/DeleteProduct";

const ProductCard = ({ product }) => {
	const editModal = useDisclosure();
	const deleteModal = useDisclosure();

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	return (
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
			cursor={"pointer"}
		>
			<Link to={`/products/${product._id}`}>
				<Image
					src={product.image}
					alt={product.name}
					h={48}
					w="fulL"
					objectFit="cover"
				/>
			</Link>
			<Box p={4}>
				<Heading as="h3" size="md" mb={2}>
					{product.name}
				</Heading>
				<Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
					${product.price}
				</Text>
				<HStack spacing={2}>
					<IconButton
						icon={<FaEdit />}
						onClick={editModal.onOpen}
						colorScheme="blue"
					/>
					<IconButton
						icon={<MdDelete />}
						onClick={deleteModal.onOpen}
						colorScheme="red"
					/>
				</HStack>
			</Box>
			{/* Modals */}
			<EditProduct disclosure={editModal} product={product} />
			<DeleteProduct disclosure={deleteModal} product={product} />
		</Box>
	);
};

export default ProductCard;
