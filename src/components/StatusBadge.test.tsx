import { render, screen } from '@testing-library/react'
import StatusBadge from './StatusBadge'

describe('StatusBadge', () => {
    test('案件ステータスの文字が表示される', () => {
        render(<StatusBadge status="募集中" type="project" />)

        expect(screen.getByText('募集中')).toBeInTheDocument()
    })

    test('要員ステータスの文字が表示される', () => {
        render(<StatusBadge status="稼働可能" type="engineer" />)

        expect(screen.getByText('稼働可能')).toBeInTheDocument()
    })

    test('提案ステータスの文字が表示される', () => {
        render(<StatusBadge status="面談調整中" type="proposal" />)

        expect(screen.getByText('面談調整中')).toBeInTheDocument()
    })
})