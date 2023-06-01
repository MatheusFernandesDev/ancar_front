import ReactPaginate from "react-paginate";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const Pagination = ({ pageCount, onPageChange, activeProps }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      previousLabel={<ArrowLeftIcon />}
      nextLabel={<ArrowRightIcon />}
      activeLinkClassName={activeProps}
    />
  );
};

export default Pagination;
