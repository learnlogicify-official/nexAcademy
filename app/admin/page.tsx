import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for LearnLogicify',
};

async function getData() {
  const [usersCount, coursesCount, problemsCount, testAttemptsCount] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.problem.count(),
    prisma.testAttempt.count(),
  ]);

  return {
    usersCount,
    coursesCount,
    problemsCount,
    testAttemptsCount,
  };
}

export default async function AdminDashboard() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.usersCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.coursesCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.problemsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Test Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.testAttemptsCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 