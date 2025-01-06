const ProblemsList = () => {
    const problems = [
        { id: 1, title: "Two Sum" },
        { id: 2, title: "Reverse Linked List" },
        { id: 3, title: "Merge Intervals" },
    ];

    return (
        <div>
            <h1>Problems</h1>
            <ul>
                {problems.map((problem) => (
                    <li key={problem.id}>
                        <a href={`/problems/${problem.id}`}>{problem.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProblemsList;