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
import { useProductStore } from "../../store/product";

const CreateProduct = ({ disclosure: { isOpen, onClose } }) => {
	const { createProduct } = useProductStore();
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: 0,
		image: ""
	});
	const toast = useToast();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (success) {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true
			});
			setNewProduct({ name: "", price: "", image: "" });
		} else {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true
			});
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create Product</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						<Input
							placeholder="Product Name"
							name="name"
							value={newProduct.name}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									name: e.target.value
								})
							}
						/>
						<Input
							placeholder="Price"
							name="price"
							type="number"
							value={newProduct.price}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									price: e.target.value
								})
							}
						/>
						<Input
							placeholder="Image URL"
							name="image"
							value={newProduct.image}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
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
						onClick={handleAddProduct}
					>
						Add
					</Button>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CreateProduct;
