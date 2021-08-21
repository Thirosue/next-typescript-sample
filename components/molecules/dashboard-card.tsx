export const DashboardCard = ({
  children,
  count,
  label,
}: {
  children: React.ReactNode
  count: number
  label: string
}): JSX.Element => {
  return (
    <>
      <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
        {children}
        <div className="mx-5">
          <h4 className="text-2xl font-semibold text-gray-700">
            {count.toLocaleString()}
          </h4>
          <div className="text-gray-500">{label}</div>
        </div>
      </div>
    </>
  )
}

export default DashboardCard
