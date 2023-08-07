import { Row, Pagination } from "react-bootstrap";
import ProductItem from "./ProductItem.js";
import { useContext } from "react";
import { AppContext } from "./AppContext.js";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ProductList = observer(() => {
  const { catalog } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (page) => {
    catalog.page = page;
    const params = new URLSearchParams();
    if (catalog.category) params.set("category", catalog.category);
    if (catalog.brand) params.set("brand", catalog.brand);
    if (catalog.mehanizm) params.set("mehanizm", catalog.mehanizm);
    if (catalog.gender) params.set("gender", catalog.gender);
    if (catalog.shape) params.set("shape", catalog.shape);
    if (catalog.material) params.set("material", catalog.material);
    if (catalog.glass) params.set("glass", catalog.glass);
    if (catalog.strap) params.set("strap", catalog.strap);
    if (catalog.power) params.set("power", catalog.power);
    if (catalog.water) params.set("water", catalog.water);
    if (catalog.page > 1) params.set("page", catalog.page);
    navigate({
      pathname: "/shop",
      search: "?" + params.toString(),
    });
  };

  const PaginationComponent = ({ catalog, handleClick }) => {
    const pages = [];
    const totalPages = 16;

    if (catalog.page > 1) {
      pages.push(
        <Pagination.Item key="prev" onClick={() => handleClick(catalog.page - 1)}>
          Предыдущая
        </Pagination.Item>
      );
    }

    if (catalog.page > 2) {
      pages.push(
        <Pagination.Item key={1} onClick={() => handleClick(1)}>
          1
        </Pagination.Item>
      );

      if (catalog.page > 3) {
        pages.push(<Pagination.Ellipsis key="ellipsis-1" disabled />);
      }
    }

    for (let page = Math.max(1, catalog.page - 1); page <= Math.min(totalPages, catalog.page + 1); page++) {
      pages.push(
        <Pagination.Item
          key={page}
          active={page === catalog.page}
          onClick={() => handleClick(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    if (catalog.page < totalPages - 1) {
      if (catalog.page < totalPages - 2) {
        pages.push(<Pagination.Ellipsis key="ellipsis-2" disabled />);
      }

      pages.push(
        <Pagination.Item key={totalPages} onClick={() => handleClick(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    if (catalog.page < totalPages) {
      pages.push(
        <Pagination.Item key="next" onClick={() => handleClick(catalog.page + 1)}>
          Следующая
        </Pagination.Item>
      );
    }

    return (
      <>
        <Helmet>
          {/* ... helmet metadata (unchanged) */}
        </Helmet>
        <Row className="mb-3">
          {catalog.products.length ? (
            catalog.products.map((item) => (
              <ProductItem key={item.id} data={item} />
            ))
          ) : (
            <p className="m-3">По вашему запросу ничего не найдено</p>
          )}
        </Row>
        {catalog.products.length > catalog.itemsPerPage && catalog.pages > 1 && <Pagination>{pages}</Pagination>}
      </>
    );
  };

  return <PaginationComponent catalog={catalog} handleClick={handleClick} />;
});

export default ProductList;
