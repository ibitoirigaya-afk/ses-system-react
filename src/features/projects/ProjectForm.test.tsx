import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectForm from './ProjectForm'
import type { Skill } from '../skills/skillTypes'

const skills: Skill[] = [
    {
        id: 1,
        name: 'React',
        category: 'フロントエンド',
    },
    {
        id: 2,
        name: 'Laravel',
        category: 'バックエンド',
    },
]

describe('ProjectForm', () => {
    test('案件フォームが表示される', () => {
        render(
            <ProjectForm
                skills={skills}
                onSubmit={() => { }}
                submitLabel="登録"
                onCancel={() => { }}
            />,
        )

        expect(screen.getByText('案件名')).toBeInTheDocument()
        expect(screen.getByText('案件概要')).toBeInTheDocument()
        expect(screen.getByText('勤務地')).toBeInTheDocument()
        expect(screen.getByText('単価')).toBeInTheDocument()
        expect(screen.getByText('必要スキル')).toBeInTheDocument()
    })

    test('入力して登録するとonSubmitが呼ばれる', async () => {
        const user = userEvent.setup()
        const handleSubmit = vi.fn()

        render(
            <ProjectForm
                skills={skills}
                onSubmit={handleSubmit}
                submitLabel="登録"
                onCancel={() => { }}
            />,
        )

        await user.type(
            screen.getByPlaceholderText('例：React管理画面開発案件'),
            'React案件',
        )

        await user.type(
            screen.getByPlaceholderText('案件内容を入力'),
            'ReactとTypeScriptを使う案件です。',
        )

        await user.type(screen.getByPlaceholderText('例：東京都 渋谷'), '東京都')

        const unitPriceInput = screen.getByPlaceholderText('例：750000')
        await user.clear(unitPriceInput)
        await user.type(unitPriceInput, '700000')

        await user.click(screen.getByRole('button', { name: 'React' }))

        await user.click(screen.getByRole('button', { name: '登録' }))

        expect(handleSubmit).toHaveBeenCalledWith({
            title: 'React案件',
            description: 'ReactとTypeScriptを使う案件です。',
            location: '東京都',
            unitPrice: 700000,
            status: '募集中',
            skillIds: [1],
        })
    })

    test('キャンセルを押すとonCancelが呼ばれる', async () => {
        const user = userEvent.setup()
        const handleCancel = vi.fn()

        render(
            <ProjectForm
                skills={skills}
                onSubmit={() => { }}
                submitLabel="登録"
                onCancel={handleCancel}
            />,
        )

        await user.click(screen.getByRole('button', { name: 'キャンセル' }))

        expect(handleCancel).toHaveBeenCalled()
    })
})