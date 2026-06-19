import { useCallback, useEffect, useState } from "react";
import type {
    BpCompany,
    BpCompanyFormData,
} from "../features/bpCompanies/bpCompanyTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ApiBpCompany = {
    id: number;
    name: string;
    contact_person: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    memo: string | null;
    engineers_count?: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
};

type ApiActionResult = {
    success: boolean;
    message?: string;
};

const convertBpCompanyFromApi = (bpCompany: ApiBpCompany): BpCompany => {
    return {
        id: bpCompany.id,
        name: bpCompany.name,
        contactPerson: bpCompany.contact_person,
        email: bpCompany.email,
        phone: bpCompany.phone,
        address: bpCompany.address,
        memo: bpCompany.memo,
        engineersCount: bpCompany.engineers_count ?? 0,
        deletedAt: bpCompany.deleted_at,
        createdAt: bpCompany.created_at,
        updatedAt: bpCompany.updated_at,
    };
};

const convertBpCompanyToApi = (formData: BpCompanyFormData) => {
    return {
        name: formData.name,
        contact_person: formData.contactPerson || null,
        email: formData.email || null,
        phone: formData.phone || null,
        address: formData.address || null,
        memo: formData.memo || null,
    };
};

export function useBpCompanies() {
    const [bpCompanies, setBpCompanies] = useState<BpCompany[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bpCompanyError, setBpCompanyError] = useState("");

    const fetchBpCompanies = useCallback(async () => {
        try {
            setIsLoading(true);
            setBpCompanyError("");

            const response = await fetch(`${API_BASE_URL}/bp-companies`);

            if (!response.ok) {
                throw new Error("BP企業一覧の取得に失敗しました。");
            }

            const data: ApiBpCompany[] = await response.json();

            setBpCompanies(data.map(convertBpCompanyFromApi));
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "BP企業一覧の取得に失敗しました。";

            setBpCompanyError(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBpCompanies();
    }, [fetchBpCompanies]);

    const createBpCompany = async (
        formData: BpCompanyFormData,
    ): Promise<ApiActionResult> => {
        try {
            setBpCompanyError("");

            const response = await fetch(`${API_BASE_URL}/bp-companies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(convertBpCompanyToApi(formData)),
            });

            if (!response.ok) {
                throw new Error("BP企業の登録に失敗しました。");
            }

            const createdBpCompany: ApiBpCompany = await response.json();

            setBpCompanies((prev) => [
                convertBpCompanyFromApi(createdBpCompany),
                ...prev,
            ]);

            return {
                success: true,
            };
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "BP企業の登録に失敗しました。";

            setBpCompanyError(message);

            return {
                success: false,
                message,
            };
        }
    };

    const updateBpCompany = async (
        id: number,
        formData: BpCompanyFormData,
    ): Promise<ApiActionResult> => {
        try {
            setBpCompanyError("");

            const response = await fetch(`${API_BASE_URL}/bp-companies/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(convertBpCompanyToApi(formData)),
            });

            if (!response.ok) {
                throw new Error("BP企業の更新に失敗しました。");
            }

            const updatedBpCompany: ApiBpCompany = await response.json();

            setBpCompanies((prev) =>
                prev.map((bpCompany) =>
                    bpCompany.id === id
                        ? convertBpCompanyFromApi(updatedBpCompany)
                        : bpCompany,
                ),
            );

            return {
                success: true,
            };
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "BP企業の更新に失敗しました。";

            setBpCompanyError(message);

            return {
                success: false,
                message,
            };
        }
    };

    const deleteBpCompany = async (id: number): Promise<ApiActionResult> => {
        try {
            setBpCompanyError("");

            const response = await fetch(`${API_BASE_URL}/bp-companies/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("BP企業の削除に失敗しました。");
            }

            await fetchBpCompanies();

            return {
                success: true,
            };
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "BP企業の削除に失敗しました。";

            setBpCompanyError(message);

            return {
                success: false,
                message,
            };
        }
    };

    const restoreBpCompany = async (id: number): Promise<ApiActionResult> => {
        try {
            setBpCompanyError("");

            const response = await fetch(`${API_BASE_URL}/bp-companies/${id}/restore`, {
                method: "PATCH",
            });

            if (!response.ok) {
                throw new Error("BP企業の復元に失敗しました。");
            }

            await fetchBpCompanies();

            return {
                success: true,
            };
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "BP企業の復元に失敗しました。";

            setBpCompanyError(message);

            return {
                success: false,
                message,
            };
        }
    };

    return {
        bpCompanies,
        isLoading,
        bpCompanyError,
        fetchBpCompanies,
        createBpCompany,
        updateBpCompany,
        deleteBpCompany,
        restoreBpCompany,
    };
}