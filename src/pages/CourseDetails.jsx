import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { IoStar } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";

const CourseDetails = () => {
  
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch course by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // Enroll handler
  const handleEnrollBtn = () => {
    // Placeholder: just toast success
    Swal.fire({
      icon: "success",
      title: "Enrolled successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (!course)
    return <p className="text-center mt-20 text-gray-500">Course not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Course Image */}
        <div className="lg:w-1/2">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Course Details */}
        <div className="lg:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="text-gray-600">
            {course.category} • {course.duration}
          </p>
          <p className="text-xl font-semibold">${course.price}</p>
          <p className="text-gray-700">{course.description}</p>

          {/* Instructor Info */}
          <div className="flex items-center gap-3 mt-4">
            <img
              src={course.instructor?.photo}
              alt={course.instructor?.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{course.instructor?.name}</p>
              <p className="text-sm text-gray-500">{course.instructor?.bio}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-4">
            <p className="flex gap-1 items-center">
              Rating: {course.rating} <IoStar />
            </p>
            <p className="flex items-center gap-1">
              Enrolled: <HiUsers />
              {course.enrolledStudents}
            </p>
            {course.isFeatured && (
              <span className="badge badge-primary">Featured</span>
            )}
          </div>

          {/* Enroll Button */}
          <button onClick={handleEnrollBtn} className="btn btn-primary mt-6">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
