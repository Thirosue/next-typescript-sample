import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '../testUtils'
import Login from '../../pages/login'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import axios from 'axios'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

class Page {
  container: HTMLElement
  constructor(container: HTMLElement) {
    this.container = container
  }

  Eメール入力エリア(): Element {
    return this.container.querySelector('#email')
  }

  Eメールエラーメッセージエリア(): Element {
    return this.container.querySelector('.email-error-message-area')
  }

  パスワード入力エリア(): Element {
    return this.container.querySelector('#password')
  }

  パスワードエラーメッセージエリア(): Element {
    return this.container.querySelector('.password-error-message-area')
  }

  オートログインチェックボックス(): Element {
    return this.container.querySelector('#rememberMe')
  }

  確認モーダル(): Element {
    return this.container.querySelector('.modal-dialog')
  }

  確認モーダルタイトル(): Element {
    return this.container.querySelector('.modal-title')
  }

  確認モーダルメッセージ(): Element {
    return this.container.querySelector('.modal-message')
  }

  確認モーダルキャンセルボタン(): Element {
    return this.container.querySelector('.modal-cancel')
  }

  確認モーダルサブミットボタン(): Element {
    return this.container.querySelector('.modal-submit')
  }

  ログインボタン(): Element {
    return this.container.querySelector('.primary-button')
  }

  Email入力(value: string): void {
    fireEvent.change(this.Eメール入力エリア(), { target: { value } })
  }

  パスワード入力(value: string): void {
    fireEvent.change(this.パスワード入力エリア(), { target: { value } })
  }

  オートログインチェック(): void {
    fireEvent.click(this.オートログインチェックボックス())
  }

  確認モーダルキャンセルボタンクリック(): void {
    fireEvent.click(this.確認モーダルキャンセルボタン())
  }

  確認モーダルサブミットボタンクリック(): void {
    fireEvent.click(this.確認モーダルサブミットボタン())
  }

  ログインボタンクリック(): void {
    fireEvent.click(this.ログインボタン())
  }
}

describe('Login page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Login />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  describe('入力バリデーション', () => {
    it('Eメール未入力で、ログインボタンをクリックしたとき、Eメールが必須エラーとなること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.ログインボタンクリック()
      })
      expect(page.Eメールエラーメッセージエリア().textContent).toEqual(
        '入力してください'
      )
    })
    it('Eメールをフォーマット誤りで入力のうえ、ログインボタンをクリックしたとき、Eメールがフォーマットエラーとなること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.Email入力('test@test')
        page.ログインボタンクリック()
      })
      expect(page.Eメールエラーメッセージエリア().textContent).toEqual(
        'メールアドレスを入力してください'
      )
    })
    it('パスワード未入力で、ログインボタンをクリックしたとき、パスワードが必須エラーとなること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.ログインボタンクリック()
      })
      expect(page.パスワードエラーメッセージエリア().textContent).toEqual(
        '入力してください'
      )
    })
    it('パスワードを桁数不足で入力のうえ、ログインボタンをクリックしたとき、パスワードがフォーマットエラーとなること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.パスワード入力('Pp1?')
        page.ログインボタンクリック()
      })
      expect(page.パスワードエラーメッセージエリア().textContent).toEqual(
        'アルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて8文字以上で入力してください'
      )
    })
    it('パスワードを組み合わせ不足（記号不足）で入力のうえ、ログインボタンをクリックしたとき、パスワードがフォーマットエラーとなること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.パスワード入力('Ppppppppppp1')
        page.ログインボタンクリック()
      })
      expect(page.パスワードエラーメッセージエリア().textContent).toEqual(
        'アルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて8文字以上で入力してください'
      )
    })
    it('パスワードを組み合わせ不足（数字不足）で入力のうえ、ログインボタンをクリックしたとき、パスワードがフォーマットエラーとなること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.パスワード入力('Ppppppppppp?')
        page.ログインボタンクリック()
      })
      expect(page.パスワードエラーメッセージエリア().textContent).toEqual(
        'アルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて8文字以上で入力してください'
      )
    })
    it('パスワードを組み合わせ不足（アルファベット小文字不足）で入力のうえ、ログインボタンをクリックしたとき、パスワードがフォーマットエラーとなること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.パスワード入力('PXXXXXXXXXXXX1?')
        page.ログインボタンクリック()
      })
      expect(page.パスワードエラーメッセージエリア().textContent).toEqual(
        'アルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて8文字以上で入力してください'
      )
    })
    it('パスワードを組み合わせ不足（アルファベット大文字不足）で入力のうえ、ログインボタンをクリックしたとき、パスワードがフォーマットエラーとなること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.パスワード入力('ppppppppppppppp1?')
        page.ログインボタンクリック()
      })
      expect(page.パスワードエラーメッセージエリア().textContent).toEqual(
        'アルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて8文字以上で入力してください'
      )
    })
  })

  describe('オートログイン設定', () => {
    it('オートログイン未設定状態でオートログインチェックボックスをチェックしたとき、有効にする旨の確認ダイアログが表示されること', async () => {
      destroyCookie(null, 'rememberMe')
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.オートログインチェック()
      })
      expect(page.確認モーダル()).toBeTruthy()
      expect(page.確認モーダルメッセージ().textContent).toEqual(
        '自動ログインを有効にしますか？'
      )
    })
    it('オートログイン設定状態でオートログインチェックボックスをチェックしたとき、無効にする旨の確認ダイアログが表示されること', async () => {
      setCookie(null, 'rememberMe', 'true')
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.オートログインチェック()
      })
      expect(page.確認モーダル()).toBeTruthy()
      expect(page.確認モーダルメッセージ().textContent).toEqual(
        '自動ログインを無効にしますか？'
      )
    })

    it('自動ログイン有効の確認ダイアログが表示され、OKボタンを押したとき、自動ログイン設定がcookieに反映されること', async () => {
      destroyCookie(null, 'rememberMe')
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.オートログインチェック()
      })
      expect(parseCookies(null).rememberMe).not.toBeTruthy()
      await act(async () => {
        page.確認モーダルサブミットボタンクリック()
      })
      expect(parseCookies(null).rememberMe).toEqual('true')
    })

    it('自動ログイン無効の確認ダイアログが表示され、OKボタンを押したとき、自動ログイン設定がcookieに反映されること', async () => {
      setCookie(null, 'rememberMe', 'true')
      const { container } = render(<Login />, {})
      const page = new Page(container)
      await act(async () => {
        page.オートログインチェック()
      })
      expect(parseCookies(null).rememberMe).toEqual('true')
      await act(async () => {
        page.確認モーダルサブミットボタンクリック()
      })
      expect(parseCookies(null).rememberMe).not.toBeTruthy()
    })
  })

  describe('ログイン確認', () => {
    it('Emailとパスワードに正しいフォーマットを入力の上、ログインボタンを押したとき、認証APIにID/PasswordをPutすること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      axios.put = jest.fn().mockImplementation(() =>
        Promise.resolve({
          data: {},
        })
      )
      await act(async () => {
        page.Email入力('test@test.com')
        page.パスワード入力('Password1?')
        page.ログインボタンクリック()
      })
      expect(axios.put).toBeCalledTimes(1)
      expect(axios.put).toBeCalledWith('/api/auth', {
        id: 'test@test.com',
        password: 'Password1?',
      })
    })

    it('ログイン時に、認証APIが認証エラー（401）を返すとき、認証エラーのアラートダイアログが表示されること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      axios.put = jest.fn().mockImplementation(() =>
        Promise.reject({
          response: {
            status: 401,
          },
        })
      )
      await act(async () => {
        page.Email入力('test@test.com')
        page.パスワード入力('Password1?')
        page.ログインボタンクリック()
      })
      expect(page.確認モーダル()).toBeTruthy()
      expect(page.確認モーダルタイトル().textContent).toEqual('認証エラー')
      expect(page.確認モーダルメッセージ().textContent).toEqual(
        'Emailもしくはパスワードが誤っています'
      )
    })

    it('ログイン時に、認証APIがシステムエラー（500）を返すとき、システムエラーのアラートダイアログが表示されること', async () => {
      const { container } = render(<Login />, {})
      const page = new Page(container)
      axios.put = jest.fn().mockImplementation(() =>
        Promise.reject({
          response: {
            status: 500,
          },
        })
      )
      await act(async () => {
        page.Email入力('test@test.com')
        page.パスワード入力('Password1?')
        page.ログインボタンクリック()
      })
      expect(page.確認モーダル()).toBeTruthy()
      expect(page.確認モーダルタイトル().textContent).toEqual('システムエラー')
      expect(page.確認モーダルメッセージ().textContent).toEqual(
        'エラーが発生しました。しばらくしてからもう一度お試しください。'
      )
    })
  })
})
