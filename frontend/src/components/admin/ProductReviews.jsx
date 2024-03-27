import React, { useState, useEffect } from "react";
import {toast } from "react-hot-toast";
import {MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useLazyGetProductReviewsQuery } from "../../redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout";
import Loader from "../layout/Loader";

const ProductReviews = () => {

    const [productId, setProductId] = useState("");

    const [getProductReviews,{data, isLoading, error }]=
useLazyGetProductReviewsQuery();

useEffect (() => {
    if (error) {
    toast.error(error?.data?.message);
    }
    // if (deleteError) {
    // toast.error(deleteError?.data?.message);
    // }
    // if (isSuccess) {
    // toast.success("User Deleted");
    // }
    }, [error]);


    const submitHandler = (e) => {
        e.preventDefault();
        getProductReviews(productId);
        };

        const setReviews = () => {
            const reviews = {
                columns: [
                    { label: "Review ID", field: "id", sort: "asc" },
                    { label: "Rating", field: "rating", sort: "asc" },
                    { label: "Comment", field: "comment", sort: "asc" },
                    { label: "User", field: "user", sort: "asc" },
                    { label: "Actions", field: "actions", sort: "asc" },
                ],
                rows: [],
            };
    
            data?.reviews?.forEach((review) => {
                reviews.rows.push({
                    id: review?._id,
                    rating: review?.rating,
                    comment: review?.comment,
                    user: review?.user?.name,
                    actions: (
                        <div className="d-flex">
                           
                            <button
                                className="btn btn-outline-danger ms-2"
                                // onClick={() => deletereviewHandler(review?._id)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    ),
                });
            });
    
            return reviews;
        };
    
        if (isLoading) return <Loader />;

  return (
    <AdminLayout>
       <div className="row justify-content-center my-5">
      <div className="col-6">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="productId_field" className="form-label">
              Enter Product ID
            </label>
            <input
              type="text"
              id="productId_field"
              className="form-control"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <button
            id="search_button"
            type="submit"
            className="btn btn-primary w-100 py-2"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>

    {data?.reviews?.length > 0 ? 
    <MDBDataTable data={setReviews ()} className="px-3" bordered striped hover />
    : <p className="mt-5 text-center">No Reviews</p>}
    </AdminLayout>
  )
}

export default ProductReviews
