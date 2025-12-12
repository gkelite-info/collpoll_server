import AcademicDetails from "./models/academic_details";
import College from "./models/college";
import Assignment from "./models/students/assignments";
import Attendance from "./models/students/attendance";
import Fee from "./models/students/fee";
import Result from "./models/students/results";
import Stream from "./models/students/stream";
import StudentProfile from "./models/students/student_profiles";
import Subject from "./models/students/subjects";
import User from "./models/user";

async function init() {
    const isDev = false;
    await User.sync({ alter: isDev });
    await College.sync({ alter: isDev });
    await Stream.sync({ alter: isDev });
    await Subject.sync({ alter: isDev });
    await Assignment.sync({ alter: isDev });
    await Attendance.sync({ alter: isDev });
    await StudentProfile.sync({ alter: isDev });
    await Fee.sync({ alter: isDev });
    await Result.sync({ alter: isDev });
    await AcademicDetails.sync({ alter: isDev });
}

function dbInit() {
    init();
}

export default dbInit;