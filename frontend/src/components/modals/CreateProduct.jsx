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
	Textarea,
	useToast,
	VStack
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "../../utils/axios";

const CreateProduct = ({ disclosure: { isOpen, onClose } }) => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: 0,
		image: "",
		description: ""
	});
	const toast = useToast();

	const handleAddProduct = async () => {
		const { data } = await axios.post("/products", newProduct);
		if (data.success) {
			toast({
				title: "Success",
				description: data.message,
				status: "success",
				isClosable: true
			});
			setNewProduct({ name: "", price: "", image: "" });
		} else {
			toast({
				title: "Error",
				description: data.message,
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
						<Textarea
							placeholder="Description"
							name="description"
							value={newProduct.description}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									description: e.target.value
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
