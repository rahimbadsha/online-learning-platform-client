import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyCourse = () => {
  const { user, loading } = use(AuthContext);
  const [courses, setCourses] = useState([]);

  // fetch courses by login user email
  useEffect(() => {
    if (!loading && user?.email) {
      fetch(`http://localhost:3000/my-courses?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setCourses(data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, loading]);

  // delete course
  const handleDeleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/delete-course/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remainingCourses = courses.filter(
                (course) => course._id !== id
              );
              setCourses(remainingCourses);
              Swal.fire("Deleted!", "Your course has been deleted.", "success");
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong while deleting the course.",
            });
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-base-100 text-base-content transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        My Added Courses 
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-base-content/70 text-lg">
          You haven’t added any courses yet.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="relative group bg-base-200 text-base-content shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <figure>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="p-5">
                <h2 className="text-lg font-semibold mb-2 line-clamp-1">
                  {course.title}
                </h2>
                <p className="text-sm text-base-content/70 line-clamp-2 mb-3">
                  {course.description}
                </p>
                <div className="flex justify-between items-center text-sm text-base-content/80">
                  <span>$ {course.price}</span>
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <Link
                  to={`/courses/course-details/${course._id}`}
                  className="btn btn-sm bg-white text-black hover:bg-primary hover:text-white"
                >
                  View
                </Link>
                <Link
                  to={`/courses/update-course/${course._id}`}
                  className="btn btn-sm bg-info text-white hover:bg-info/90"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDeleteBtn(course._id)}
                  className="btn btn-sm bg-error text-white hover:bg-error/90"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourse;
