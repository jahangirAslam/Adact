import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";
import Details from "./Details";

const pageConfig = {
  headers: {
    title: "Edit Product",
    breadcrumb: [
      {
        name: "Product",
        path: "products/all_products"
      },
      {
        name: "Edit",
      }
    ]
  }

}

const EditProduct = () => {
  const { id } = useParams();

  const tabs = [
    {
      title: "Details",
      content: <Details id={ id } />
    },
  ]

  return <TabComponent headers={ pageConfig.headers } tabs={ tabs }></TabComponent>;
}

export default EditProduct;
