import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/courses");
        setCourses(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Handle filtering
  useEffect(() => {
    let filterCourse = [...courses];

    if (category !== "All") {
      filterCourse = filterCourse.filter((c) => c.category === category);
    }
    if (search.trim()) {
      filterCourse = filterCourse.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filterCourse);
  }, [search, category, courses]);

  if (loading)
    return (
      <Loading></Loading>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Courses</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <input
          type="text"
          placeholder="Search course..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Web Development</option>
          <option>UI/UX Design</option>
          <option>Data Science</option>
          <option>Programming</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No courses found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <div
              key={course._id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition"
            >
              <figure>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{course.title}</h3>
                <p className="text-sm text-gray-600">
                  {course.category} • {course.duration}
                </p>
                <p className="font-semibold">${course.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={course.instructor?.photo}
                    alt={course.instructor?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">
                    {course.instructor?.name}
                  </span>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/course-details/${course._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
