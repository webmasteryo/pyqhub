{
  /* CHOOSE BY YEAR SECTION */
}
<section>
  <div className="mt-15 mx-5">
    <h2 className="text-3xl font-bold text-center">
      Previous Year Questions by Year
    </h2>
    <div className="flex flex-wrap gap-6 mt-10">
      {examss.map((exam) => (
        <div
          key={exam.name}
          className="mt-10 mx-10 border-2 p-5 rounded-lg shadow-lg w-70"
        >
          <h3 className="font-medium">{exam.name}</h3>
          <div className="flex flex-wrap gap-2 mt-5">
            {examYears.map((year) => (
              <Link
                key={year}
                href={`/exam/${exam.slug}/${year}`}
                className="btn btn-outline"
              >
                {year}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>;
