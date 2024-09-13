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
import { useProductStore } from "../../store/product";

const DeleteProduct = ({ product, disclosure: { isOpen, onClose } }) => {
	const { deleteProduct } = useProductStore();

	const toast = useToast();

	const handleDeleteProduct = async () => {
		const { success, message } = await deleteProduct(product._id);
		if (success) {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true
			});
		} else {
			toast({
				title: "Error",
				description: message,
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
