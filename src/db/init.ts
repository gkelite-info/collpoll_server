import AcademicDetails from "./models/academic_details";
import College from "./models/college";
import Assignment from "./models/students/assignments";
import Attendance from "./models/students/attendance";
import Fee from "./models/students/fee";
<<<<<<< Updated upstream
import SkillCategory from "./models/students/profile/skills/SkillCategory";
import Skill from "./models/students/profile/skills/skills";
import UserSkill from "./models/students/profile/skills/userSkill";
=======
import CompetitiveExam from "./models/students/profile/competitiveExams";
import InternshipDetails from "./models/students/profile/internship";
import ProfileSummaryDetails from "./models/students/profile/profileSummary";
import ProjectDetails from "./models/students/profile/projects";
>>>>>>> Stashed changes
import Result from "./models/students/results";
import Stream from "./models/students/stream";
import StudentProfile from "./models/students/student_profiles";
import Subject from "./models/students/subjects";
import User from "./models/user";
import PrimaryEducation from "./models/students/profile/primary_education";
import SecondaryEducation from "./models/students/profile/secondary_education";
import UndergraduateEducation from "./models/students/profile/undergraduate_education";
import PhDEducation from "./models/students/profile/phd_education";

async function init() {
<<<<<<< Updated upstream
    const isDev = false;
    await User.sync({ alter: isDev});
    await College.sync({ alter: isDev });
    await Stream.sync({ alter: isDev });
    await Subject.sync({ alter: isDev });
    await Assignment.sync({ alter: isDev });
    await Attendance.sync({ alter: isDev });
    await StudentProfile.sync({ alter: isDev });
    await Fee.sync({ alter: isDev });
    await Result.sync({ alter: isDev });
    await AcademicDetails.sync({ alter: isDev });
<<<<<<< Updated upstream
    // await SkillCategory.sync({ alter: isDev });
    // await Skill.sync({ alter: isDev });
    // await UserSkill.sync({ alter: isDev });
=======
    await PrimaryEducation.sync({ alter: isDev});
    await SecondaryEducation.sync({ alter: isDev});
    await UndergraduateEducation.sync({ alter: isDev});
    await PhDEducation.sync({ alter: isDev});
>>>>>>> Stashed changes
=======
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
  await InternshipDetails.sync({ alter: isDev });
  await ProjectDetails.sync({ alter: isDev });
  await ProfileSummaryDetails.sync({ alter: isDev });
  await CompetitiveExam.sync({ alter: isDev });
>>>>>>> Stashed changes
}

function dbInit() {
  init();
}
<<<<<<< Updated upstream
export default dbInit;
=======

export default dbInit;
>>>>>>> Stashed changes
