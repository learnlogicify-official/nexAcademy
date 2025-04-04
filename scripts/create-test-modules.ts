import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Get all courses
    const courses = await prisma.course.findMany();

    for (const course of courses) {
      // Create modules for each course
      const moduleCount = 4; // Number of modules per course
      for (let i = 0; i < moduleCount; i++) {
        // Create module with submodules
        const module = await prisma.module.create({
          data: {
            title: `Module ${i + 1} - ${getModuleTitle(i)}`,
            description: `Learn about ${getModuleTitle(i)} in this comprehensive module.`,
            type: 'TECHNICAL',
            order: i + 1,
            duration: `${Math.floor(Math.random() * 4) + 2}h`, // 2-5 hours
            courseId: course.id,
            submodules: {
              create: Array.from({ length: 3 }, (_, j) => ({
                title: `${getModuleTitle(i)} Level ${j + 1} - (10 Programming Questions)`,
                type: 'PROGRAMMING',
                questions: 10,
                order: j + 1,
              })),
            },
          },
          include: {
            submodules: true,
          },
        });

        console.log(`Created module: ${module.title} for course: ${course.title} with ${module.submodules.length} submodules`);
      }
    }

    console.log('Test modules and submodules created successfully!');
  } catch (error) {
    console.error('Error creating test data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function getModuleTitle(index: number): string {
  const titles = [
    'Pointers',
    'Structures',
    'Recursion',
    'Singly LinkedList',
    'Doubly LinkedList',
    'Stack',
    'Queue',
    'Trees',
  ];
  return titles[index] || `Advanced Topic ${index + 1}`;
}

main(); 