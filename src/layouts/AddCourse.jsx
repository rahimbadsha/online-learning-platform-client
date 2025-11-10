import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";

const AddCourse = () => {
  const { user } = useContext(AuthContext);

  const handleAddCourseBtn = (e) => {
    e.preventDefault();
    const form = e.target;
    const randomRating = (Math.random() * 4 + 1).toFixed(1);
    const randomStudents = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

    const newCourse = {
      title: form.title.value,
      thumbnail: form.thumbnail.value,
      price: parseFloat(form.price.value),
      duration: form.duration.value,
      category: form.category.value,
      description: form.description.value,
      isFeatured: form.isFeatured.checked,
      instructor: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        bio: "Instructor from Learnify platform", // optional static bio
      },
      rating: parseFloat(randomRating),
      enrolledStudents: randomStudents,
      createdAt: new Date().toISOString(),
    };

    fetch("http://localhost:3000/courses", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCourse),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.acknowledged) {
          form.reset();
          Swal.fire({
            icon: "success",
            title: "Course added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to add course",
          text: err.message,
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 shadow-lg p-8 rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Add New Course
      </h2>

      <form onSubmit={handleAddCourseBtn} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail Image URL"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (USD)"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 6 weeks)"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Web Development)"
            className="input input-bordered w-full"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Course Description"
          className="textarea textarea-bordered w-full"
          rows="4"
          required
        ></textarea>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isFeatured" className="checkbox" />
          <span>Mark as Featured</span>
        </label>

        <div className="divider"></div>

        {/* instructor details from firebase */}
        <div className="p-4 bg-base-200 rounded-lg">
          <h3 className="font-semibold mb-2">Instructor Details</h3>
          <p>
            <strong>Name:</strong> {user?.displayName || "Anonymous"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="Instructor"
              className="w-16 h-16 rounded-full mt-2"
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
