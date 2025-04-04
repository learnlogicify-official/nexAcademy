import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Function to generate a random password
function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

async function resetUserPasswords() {
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users to reset passwords`);

    for (const user of users) {
      const newPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      console.log(`Reset password for ${user.email} (${user.role}) to: ${newPassword}`);
    }

    console.log('Password reset process completed successfully!');
  } catch (error) {
    console.error('Error during password reset:', error);
  }
}

async function enrollAllUsers() {
  try {
    // Get all users (including admins)
    const users = await prisma.user.findMany();

    // Get all courses
    const courses = await prisma.course.findMany();

    console.log(`Found ${users.length} users and ${courses.length} courses`);

    // Enroll each user in each course
    for (const user of users) {
      for (const course of courses) {
        // Check if enrollment already exists
        const existingEnrollment = await prisma.enrolledCourse.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: course.id,
            },
          },
        });

        if (!existingEnrollment) {
          // Determine course status and progress based on dates
          const now = new Date();
          const isCompleted = now > course.endDate;
          const isUpcoming = now < course.startDate;
          const isInProgress = !isCompleted && !isUpcoming;

          // Calculate progress based on status
          let progress = 0;
          if (isCompleted) {
            progress = 100;
          } else if (isInProgress) {
            // Random progress between 0 and 100 for in-progress courses
            progress = Math.floor(Math.random() * 100);
          }

          // Create enrollment
          await prisma.enrolledCourse.create({
            data: {
              userId: user.id,
              courseId: course.id,
              progress,
              status: isCompleted ? 'completed' : isUpcoming ? 'upcoming' : 'in_progress',
              lastAccessed: new Date(),
              deadline: course.endDate,
              isStarred: Math.random() > 0.7, // 30% chance of being starred
              isRemoved: false,
              completedLessons: [],
            },
          });

          console.log(`Enrolled user ${user.email} (${user.role}) in course ${course.title} with ${progress}% progress`);
        }
      }
    }

    console.log('Enrollment process completed successfully!');
  } catch (error) {
    console.error('Error during enrollment:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Check if password reset is requested
const args = process.argv.slice(2);
if (args.includes('--reset-passwords')) {
  resetUserPasswords().then(() => enrollAllUsers());
} else {
  enrollAllUsers();
} 