import React, { useEffect, useState } from "react";
import { ImStarFull } from "react-icons/im";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/popular-courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching popular courses:", err);
        Swal.fire("Error", "Failed to load popular courses", "error");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner text-primary text-4xl"></span>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-12 bg-base-200">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-base-content">
        Popular Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="card bg-base-100 shadow-lg rounded-xl overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <figure>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body text-base-content">
              <h3 className="card-title text-xl font-semibold">
                {course.title}
              </h3>
              <p className="text-sm opacity-80">{course.category}</p>
              <p className="opacity-90 mt-2 line-clamp-3">
                {course.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-lg">${course.price}</span>
                <span className="badge badge-primary">
                  {course.rating.toFixed(1)} <ImStarFull />
                </span>
              </div>

              <div className="card-actions mt-4">
                <Link
                  to={`/courses/course-details/${course._id}`}
                  className="btn btn-outline btn-primary w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
