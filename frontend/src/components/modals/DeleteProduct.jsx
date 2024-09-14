import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useToast
} from "@chakra-ui/react";
import axios from "../../utils/axios";

const DeleteProduct = ({ product, disclosure: { isOpen, onClose } }) => {
	const toast = useToast();

	const handleDeleteProduct = async () => {
		try {
			await axios.delete(`/products/${product._id}`);
			toast({
				title: "Success",
				description: "Product deleted successfully",
				status: "success",
				duration: 3000,
				isClosable: true
			});
		} catch (error) {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true
			});
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Delete Product</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					Are you sure that you want to delete{" "}
					<Text
						as="strong"
						bgGradient={"linear(to-r, cyan.400, blue.500)"}
						bgClip={"text"}
						color={"cyan.400"}
					>
						{product.name}
					</Text>
					?
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="blue"
						mr={3}
						onClick={handleDeleteProduct}
					>
						Yes
					</Button>
					<Button variant="ghost" onClick={onClose}>
						No
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default DeleteProduct;
