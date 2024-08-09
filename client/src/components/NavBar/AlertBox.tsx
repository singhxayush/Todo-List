import { ForwardedRef, forwardRef, useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

interface AlertBoxProps {
  isDeleteOpen: boolean;
  onDeleteClose: () => void;
  isClearOpen: boolean;
  onClearClose: () => void;
}

export const AlertBox = forwardRef<HTMLButtonElement, AlertBoxProps>(
  ({ isDeleteOpen, onDeleteClose, isClearOpen, onClearClose }: AlertBoxProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const cancelRef = useRef<HTMLButtonElement>(null) || ref;

    const handleDeleteAccount = () => {
      console.log("Account deleted");
      onDeleteClose();
    };

    const handleClearData = () => {
      console.log("Data cleared");
      onClearClose();
    };

    return (
      <>
        {/* Delete Account Confirmation Dialog */}
        <AlertDialog
          motionPreset='slideInBottom'
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
          isCentered
          closeOnOverlayClick={false}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account 
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteAccount} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {/* Clear Data Confirmation Dialog */}
        <AlertDialog
          motionPreset='slideInBottom'
          isOpen={isClearOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClearClose}
          isCentered
          closeOnOverlayClick={false}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Clear Data
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to clear all data? This action cannot be
                undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClearClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleClearData} ml={3}>
                  Clear
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }
);

AlertBox.displayName = "AlertBox";
