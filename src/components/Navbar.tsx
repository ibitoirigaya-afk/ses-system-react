import type { User } from "../features/auth/authTypes";

type Page =
  | "top"
  | "projects"
  | "bpCompanies"
  | "engineers"
  | "skills"
  | "proposals"
  | "workRecords";

type Props = {
  currentUser: User;
  currentPage: Page;
  onChangePage: (page: Page) => void;
};

export default function Navbar({
  currentUser,
  currentPage,
  onChangePage,
}: Props) {
  const buttonClass = (page: Page) => {
    return currentPage === page
      ? "rounded bg-blue-600 px-3 py-2 text-sm font-bold text-white"
      : "rounded px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100";
  };

  return (
    <nav className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl gap-2 px-8 py-3">
        <button
          onClick={() => onChangePage("top")}
          className={buttonClass("top")}
        >
          TOP
        </button>

        <button
          onClick={() => onChangePage("projects")}
          className={buttonClass("projects")}
        >
          案件
        </button>

        <button
          onClick={() => onChangePage("bpCompanies")}
          className={buttonClass("bpCompanies")}
        >
          BP企業
        </button>

        {(currentUser.role === "admin" || currentUser.role === "user") && (
          <button
            onClick={() => onChangePage("engineers")}
            className={buttonClass("engineers")}
          >
            要員
          </button>
        )}

        {currentUser.role === "admin" && (
          <button
            onClick={() => onChangePage("skills")}
            className={buttonClass("skills")}
          >
            スキル
          </button>
        )}

        <button
          onClick={() => onChangePage("proposals")}
          className={buttonClass("proposals")}
        >
          提案履歴
        </button>

        {currentUser.role === "admin" && (
          <button
            onClick={() => onChangePage("workRecords")}
            className={buttonClass("workRecords")}
          >
            稼働実績
          </button>
        )}
      </div>
    </nav>
  );
}
