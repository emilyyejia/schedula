const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./backend/models/user");
const TeacherProfile = require("./backend/models/teacherProfile");

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once("open", async () => {
  console.log("Connected. Seeding...");
  try {
    await User.deleteMany({ role: "teacher" });
    await TeacherProfile.deleteMany({});
    const hashedPassword = await bcrypt.hash("1234", 6);
    const teacherData = [
      {
        name: "Avery",
        email: "avery@schedula.com",
        password: hashedPassword,
        role: "teacher",
        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Avery",
      },
      {
        name: "George",
        email: "george@schedula.com",
        password: hashedPassword,
        role: "teacher",
        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=George",
      },
      {
        name: "Jocelyn",
        email: "jocelyn@schedula.com",
        password: hashedPassword,
        role: "teacher",
        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Jocelyn",
      },
      {
        name: "Jameson",
        email: "jameson@schedula.com",
        password: hashedPassword,
        role: "teacher",
        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Jameson",
      },
      {
        name: "Oliver",
        email: "oliver@schedula.com",
        password: hashedPassword,
        role: "teacher",
        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Oliver",
      },
      {
        name: "Katherine",
        email: "katherine@schedula.com",
        password: hashedPassword,
        role: "teacher",
        avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Katherine",
      },
    ];

    const createdTeachers = await User.insertMany(teacherData);

    const profileData = [
      {
        teacher: createdTeachers[0]._id,
        bio: "IELTS expert with 8+ years of experience helping international students succeed.",
        subjects: ["IELTS", "Academic English"],
        photo:
          "https://media.istockphoto.com/id/2194078950/photo/profile-picture-of-smiling-confident-arabic-businessman.jpg?s=612x612&w=0&k=20&c=hFoHVfmAgOET8r1unu8uoPvgwLzaFllpz9jeOdBxSgE=",
      },
      {
        teacher: createdTeachers[1]._id,
        bio: "SAT instructor with a background in math and verbal reasoning.",
        subjects: ["SAT", "Critical Reading"],
        photo:
          "https://media.istockphoto.com/id/1483752333/photo/businessman-in-black-suit-posing-confidently-on-isolated-background-fervent.jpg?s=612x612&w=0&k=20&c=69RagMW6nl8z0WRCwqir2KZmwhB4ZBndb4z3WkX1jm8=",
      },
      {
        teacher: createdTeachers[2]._id,
        bio: "Calculus and advanced math teacher who loves problem-solving.",
        subjects: ["Calculus", "Math", "AP Math"],
        photo:
          "https://media.istockphoto.com/id/2186590520/photo/confident-female-young-professional-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=sQCPLInrZNUtELfQQM1FFK7kZsasPAJmRULkF2vxAD0=",
      },
      {
        teacher: createdTeachers[3]._id,
        bio: "Helping students navigate college applications and admissions.",
        subjects: ["College Applications", "Essay Writing"],
        photo:
          "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
      },
      {
        teacher: createdTeachers[4]._id,
        bio: "Passionate about teaching the fundamentals of computer science.",
        subjects: ["Computer Science", "Python", "Web Development"],
        photo:
          "https://media.istockphoto.com/id/2189153631/photo/indian-curly-hair-young-adult-gen-z-business-woman-staff-worker-standing-proud-look-cam.jpg?s=612x612&w=0&k=20&c=xIFWRu24s8DAA7lYR5KUzKFxtMS2MbqveycRXyfFDSI=",
      },
      {
        teacher: createdTeachers[5]._id,
        bio: "Specialist in high school economics and business fundamentals.",
        subjects: ["Business", "Economics", "Accounting"],
        photo:
          "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
      },
    ];
    await TeacherProfile.insertMany(profileData);

    console.log("Seeded teachers and their profiles");
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
});
