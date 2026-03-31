# Implementing Logout Feature using Server Action

```js
// @/app/actions/userActions.js
...
export async function logoutUser() {
  await connectDB();
  const cookieStore = await cookies();
  const sessionId = await getUserSession();
  await Session.findByIdAndDelete(sessionId);
  cookieStore.delete("sid");
  return { success: true, message: "Logged out successfully" };
}

// @/app/page.js
...
const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      router.push("/login");
    }
};
...
```
