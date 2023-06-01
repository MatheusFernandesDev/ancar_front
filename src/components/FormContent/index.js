import React from "react";
import MainContainerHeader from "./MainContainerHeader";
import { Box, Container } from "@chakra-ui/react";

function FormContent({
	children,
	disableScroll,
	// MAIN CONTAINER
		// JOKER
		jokerHandler,
		jokerButton,
		jokerTitle,
		jokerIcon,
		// BUTTONS
		hideAll,
		hideEdit,
		hideSave,
		showAttach,
		hideNew,
		hideList,
		hideReload,
		showCancel,
		showReport,
		// HANDLER
		editHandler,
		saveHandler,
		attachHandler,
		newHandler,
		listHandler,
		reloadHandler,
		cancelHandler,
		reportHandler,
		isLoading,
		loadingText,
	...rest
}) {
	return (
		<Box width="100%" height="100%" m="1" {...rest}>
			<Box
				display="flex"
				flexDirection="column"
				borderRadius="10px"
				height="100%"
				boxShadow="2px 2px 10px #858585"
			>
				<MainContainerHeader
					// JOKER
					jokerHandler={jokerHandler}
					jokerButton={jokerButton}
					jokerTitle={jokerTitle}
					jokerIcon={jokerIcon}
					// BUTTONS
					hideAll={hideAll}
					hideEdit={hideEdit}
					hideSave={hideSave}
					showAttach={showAttach}
					hideNew={hideNew}
					hideList={hideList}
					hideReload={hideReload}
					showCancel={showCancel}
					showReport={showReport}
					// HANDLER
					editHandler={editHandler}
					saveHandler={saveHandler}
					attachHandler={attachHandler}
					newHandler={newHandler}
					listHandler={listHandler}
					reloadHandler={reloadHandler}
					cancelHandler={cancelHandler}
					reportHandler={reportHandler}
					progress={isLoading}
					loadingText={loadingText}
				/>
				<Box 
					height="100%"
					width="100%"
					padding="10px"
					backgroundColor="#FFF"
					borderRadius="0px 0px 10px 10px"
					overflowY={disableScroll ? "hidden" : "auto"}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
}

export default FormContent;
