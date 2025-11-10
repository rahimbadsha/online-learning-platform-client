import { useEffect, useState, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
import Loading from "./Loading";

const CourseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {user, loading} = use(AuthContext)

  const [course, setCourse] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch course data for automatic fill the field
  useEffect(() => {
    fetch(`http://localhost:3000/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (loading || !course) {
    return <Loading></Loading>
  }

  const handleUpdateCourseBtn = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;

    const updatedData = {
      title: form.title.value,
      thumbnail: form.thumbnail.value,
      price: parseFloat(form.price.value),
      duration: form.duration.value,
      category: form.category.value,
      description: form.description.value,
      isFeatured: form.isFeatured.checked,
      instructor: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
      rating: course.rating || 0,
      enrolledStudents: course.enrolledStudents || 0,
    };

    try {
      const res = await fetch(`http://localhost:3000/update-course/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (data.modifiedCount || data.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Course updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/my-course");
      } else {
        Swal.fire({
          icon: "error",
          title: "Update failed",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightBg">
      <div className="card w-full max-w-lg shadow-lg p-6 bg-base-100">
        <h2 className="text-2xl font-bold text-center mb-4">Update Course</h2>

        <form onSubmit={handleUpdateCourseBtn} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            defaultValue={course.title}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail URL"
            defaultValue={course.thumbnail}
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            defaultValue={course.price}
            className="input input-bordered w-full"
            required
            step="0.01"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            defaultValue={course.duration}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            defaultValue={course.category}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            defaultValue={course.description}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={course.isFeatured}
              className="checkbox checkbox-primary"
            />
            Featured Course
          </label>

          <button
            type="submit"
            className={`btn btn-primary w-full ${updating ? "loading" : ""}`}
          >
            {updating ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseUpdate;
