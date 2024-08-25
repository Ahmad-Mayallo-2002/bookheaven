"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import getLocalStorageData, {
  Book,
  converImageToBase64,
} from "../../../assets/data/data";
import { addBook } from "../../../assets/apis/addBook";
import Loading from "../../../loading";

export default function AddBook() {
  const spanRef: any = React.useRef();
  const imgRef: any = React.useRef();
  const [image, setImage] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit } = useForm<Book>();
  const handleChange = async (event: any) => {
    const file = event.target.files[0];
    spanRef.current.classList.add("hidden");
    imgRef.current.classList.remove("hidden");
    const base64Image = await converImageToBase64(file);
    setImage(base64Image);
  };
  const onSubmit: SubmitHandler<Book> = async (data) => {
    try {
      setLoading(true);
      data = { ...data, url: image, price: Number(data.price) };
      const userData = getLocalStorageData();
      const response = await addBook(userData?.token, userData?.id, data);
      const result = await response.json();
      if (response.status === 200) toast.success(result?.msg);
      if (response.status === 400) toast.info(result?.msg);
      console.log(result);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const onError = (error: any) => {
    for (const object in error)
      if (error[object].message) toast.error(error[object].message);
  };
  return (
    <>
      <div className="dashboard-head">
        <h1>Add Book</h1>
      </div>
      <form
        action="#"
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grow grid"
      >
        <div
          className="image cursor-pointer"
          style={{ backgroundColor: "#83979d" }}
        >
          <input
            type="file"
            id="bookImage"
            hidden
            {...register("url", {
              onChange: handleChange,
              required: { value: true, message: "Book Image is Required" },
            })}
          />
          <label
            htmlFor="bookImage"
            className="flex cursor-pointer items-center justify-center h-full"
          >
            <p>
              <span
                ref={spanRef}
                style={{ backgroundColor: "darkblue" }}
                className="block p-4 rounded-xl"
              >
                Upload Image
              </span>
            </p>
            <img
              ref={imgRef}
              src={image}
              className="max-w-full w-full h-full hidden"
              alt=""
            />
          </label>
        </div>
        <div className="text grid gap-4">
          <div className="inputs flex flex-col gap-y-4">
            <div>
              <input
                autoComplete="off"
                type="text"
                id="title"
                placeholder="Write Book Title"
                {...register("title", {
                  required: { value: true, message: "Title Book is Required" },
                })}
              />
            </div>
            <div>
              <input
                autoComplete="off"
                type="text"
                id="author"
                placeholder="Write Book Author"
                {...register("author", {
                  required: { value: true, message: "Author Book is Required" },
                })}
              />
            </div>
            <div>
              <input
                autoComplete="off"
                type="text"
                id="price"
                placeholder="Write Book Price"
                {...register("price", {
                  required: { value: true, message: "Price Book is Required" },
                })}
              />
            </div>
            <div>
              <input
                autoComplete="off"
                type="text"
                id="language"
                placeholder="Write Book Language"
                {...register("language", {
                  required: {
                    value: true,
                    message: "Language Book is Required",
                  },
                })}
              />
            </div>
            <div>
              <textarea
                autoComplete="off"
                id="desc"
                className="h-[150px] resize-none"
                placeholder="Write Book Description"
                {...register("desc", {
                  required: {
                    value: true,
                    message: "Description Book is Required",
                  },
                })}
              ></textarea>
            </div>
          </div>
          <div className="submit flex items-end">
            <button className="primary-button w-full">
              {loading ? (
                <>
                  <span className="flex items-center justify-center gap-x-4">
                    <Loading width={25} height={25} border="2px solid #fff" />
                    <span>Loading...</span>
                  </span>
                </>
              ) : (
                "Add New Book"
              )}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
