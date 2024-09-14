import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
	VStack
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "../../utils/axios";

const EditProduct = ({ product, disclosure: { isOpen, onClose } }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const toast = useToast();

	const handleUpdateProduct = async (updatedProduct) => {
		await axios
			.put(`/products/${product._id}`, updatedProduct)
			.then(() => {
				toast({
					title: "Success",
					description: "Product updated successfully",
					status: "success",
					duration: 3000,
					isClosable: true
				});
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.message,
					status: "error",
					duration: 3000,
					isClosable: true
				});
			})
			.finally(() => {
				onClose();
			});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Update Product</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						<Input
							placeholder="Product Name"
							name="name"
							value={updatedProduct.name}
							onChange={(e) =>
								setUpdatedProduct({
									...updatedProduct,
									name: e.target.value
								})
							}
						/>
						<Input
							placeholder="Price"
							name="price"
							type="number"
							value={updatedProduct.price}
							onChange={(e) =>
								setUpdatedProduct({
									...updatedProduct,
									price: e.target.value
								})
							}
						/>
						<Input
							placeholder="Image URL"
							name="image"
							value={updatedProduct.image}
							onChange={(e) =>
								setUpdatedProduct({
									...updatedProduct,
									image: e.target.value
								})
							}
						/>
					</VStack>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="blue"
						mr={3}
						onClick={() => handleUpdateProduct(updatedProduct)}
					>
						Update
					</Button>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EditProduct;
