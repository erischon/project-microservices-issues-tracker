import IssueCreate from "./IssueCreate";
import IssueList from "./IssueList";

function App() {
  return (
    <>
      <div className="max-w-xl mx-auto">
        <section className="flex flex-col w-full my-4">
          <h1 className="text-2xl font-bold">Create Issue</h1>

          <IssueCreate />
        </section>

        <section className="w-full">
          <h1 className="text-2xl font-bold">Issues</h1>

          <div className="h-full">
            <IssueList />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
